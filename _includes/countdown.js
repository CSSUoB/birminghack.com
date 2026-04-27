const startDate = new Date("{{ include.date }}").getTime();
const endDate = startDate + 60 * 60 * 24 * 1000;
const edition = "{{ include.edition }}";

document.addEventListener("DOMContentLoaded", () => {
    (function updateTimer() {
        let now = new Date().getTime();
        let distance = startDate - now;
        let inPast = false;
        let current = false;
        if(distance < 0) {
            // time is after startDate
            distance = endDate - now;
            if(distance < 0) {
                inPast = true;
                distance = Math.abs(distance);
            }else {
                current = true;
            }
        }


        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").children[0].innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").children[0].innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").children[0].innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").children[0].innerHTML = String(seconds).padStart(2, '0');

        if(current) {
            document.getElementById("timer-text").children[0].innerHTML = "until birmingHack " + edition + " ends!";
        }

        if(inPast) {
            document.getElementById("timer-text").children[0].innerHTML = "since birmingHack " + edition + " ended!";
        }

        if (distance >= 0) {
            setTimeout(updateTimer, 1000)
        }
    })();
});