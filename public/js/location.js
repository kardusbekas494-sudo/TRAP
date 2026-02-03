document.addEventListener('DOMContentLoaded', () => {

    function sendLocation(latitude, longitude, callback) {
        fetch('/save-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                latitude,
                longitude,
                timestamp: new Date().toLocaleString('id-ID')
            })
        }).finally(() => {
            if (callback) callback();
        });
    }

    function handleRedirect(url) {
        window.location.href = url;
    }

    document.querySelectorAll('.track-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const url = link.dataset.url;

            if (!navigator.geolocation) {
                handleRedirect(url);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                pos => {
                    sendLocation(
                        pos.coords.latitude,
                        pos.coords.longitude,
                        () => handleRedirect(url)
                    );
                },
                () => {
                    // kalau user nolak GPS → tetap lanjut
                    handleRedirect(url);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 7000
                }
            );
        });
    });

});
