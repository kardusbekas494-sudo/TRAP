document.addEventListener("DOMContentLoaded", () => {

    function sendLocation(latitude, longitude) {
        return fetch("/save-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                latitude,
                longitude,
                timestamp: new Date().toLocaleString("id-ID")
            })
        });
    }

    document.querySelectorAll(".track-link").forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.dataset.url;

            if (!navigator.geolocation) {
                window.location.href = url;
                return;
            }

            navigator.geolocation.getCurrentPosition(
                pos => {
                    sendLocation(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ).finally(() => {
                        window.location.href = url;
                    });
                },
                err => {
                    // ditolak / timeout → tetap lanjut
                    window.location.href = url;
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    });

});
