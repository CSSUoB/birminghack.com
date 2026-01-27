const countDownDate = new Date("{{ include.date }}").getTime();

document.addEventListener("DOMContentLoaded", () => {
    (function updateTimer() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").children[0].innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").children[0].innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").children[0].innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").children[0].innerHTML = String(seconds).padStart(2, '0');

        if (distance >= 0) {
            setTimeout(updateTimer, 1000)
        }
    })();
});