function errorAnimator(element) {
    element.previousElementSibling.style.color = "hsl(0, 100%, 67%)";
    element.nextElementSibling.style.animation = "error_animation 0.5s 2 backwards ease";
    setTimeout(() => {
        element.nextElementSibling.style.animation = null;
        element.nextElementSibling.style.opacity = "1";
        
    }, 900);
    element.nextElementSibling.style.animationPlayState = "Initial";
    element.nextElementSibling.style.opacity = "0";
    element.style.borderColor = 'hsl(0, 100%, 67%)';

}

function deError(element) {
    element.previousElementSibling.style.color = "initial";
    element.nextElementSibling.style.animation = null;
    element.nextElementSibling.style.opacity = "0";
    element.nextElementSibling.style.animationPlayState = "Initial";
    element.style.borderColor = 'initial';

}

document.addEventListener("DOMContentLoaded", () => {

    // start the validation on arrow-click
    const arrow = document.querySelector("#arrow");
    arrow.addEventListener("click" ,() => {
        const dates = document.querySelectorAll(".dates");

        let isValid = true;
        // Check to see all the fields are not empty
        dates.forEach((element) => {
            if ((element.value).length == 0) {
                errorAnimator(element);
                isValid = false;
            }
        })

        const today = new Date();
        const day = document.querySelector(".day");
        const month = document.querySelector(".month");
        const year = document.querySelector(".year");

        // check if all fields have valid inputs
        if (!(1 <= day.value && day.value <= 31) && (day.value).length != 0) {
            day.nextElementSibling.innerHTML = "Must be a valid day";
            errorAnimator(day);
            isValid = false;
            console.log("not True")
        } else if ((1 <= day.value && day.value <= 31) && (day.value).length != 0) {
            console.log("deErrored day")
            deError(day);
        }

        if (!(1 <= month.value && month.value <= 12)  && (month.value).length != 0) {
            month.nextElementSibling.innerHTML = "Must be a valid month";
            errorAnimator(month);
            isValid = false;
            console.log("not True")
        } else if ((1 <= month.value && month.value <= 12)  && (month.value).length != 0) {
            console.log("deErrored month")
            deError(month);
        }

        if (!(year.value <= today.getFullYear()) && (year.value).length != 0) {
            year.nextElementSibling.innerHTML = "Must be in the past";
            errorAnimator(year);
            console.log("not True")
            isValid = false;
        } else if ((year.value <= today.getFullYear()) && (year.value).length != 0){
            console.log("deErrored year")
            deError(year);
        }

        const date = `${year.value}/${month.value}/${day.value}`;
        const dateObj = new Date(date);
        
        // Remove the errors if all inputs are right
        if (isValid == true) {
            dates.forEach((element) => {
                if ((element.value).length == 0) {
                    console.log("deErrored all")
                    deError(element);
                }
            })

            // Calculate years, months and days
            let todayYear = today.getFullYear();
            let todayMonth = today.getMonth() + 1;
            let todayDay = today.getDate();
    
            if (today.getMonth() < dateObj.getMonth()) {
                console.log("today month less the the month");
                todayYear = todayYear - 1;
                todayMonth += 12;
            }
    
            if (todayDay < dateObj.getDate()) {
                console.log("today day less than day");
                todayMonth = todayMonth - 1;
                todayDay = todayDay + 31;
                
            }
            const yearsSince = (todayYear - dateObj.getFullYear());
            const monthsSince = (todayMonth - (dateObj.getMonth() + 1));
            const daysSince = (todayDay - dateObj.getDate());

            let yCounter = 1;
            const y = window.setInterval(() => {
                yCounter++;
                document.getElementById("year").innerHTML = yCounter;
                if (yCounter >= yearsSince) {
                    clearInterval(y);
                }
            },100)

            let mCounter = 1;
            const m = window.setInterval(() => {
                mCounter ++;
                document.getElementById("month").innerHTML = mCounter;
                if (mCounter >= monthsSince) {
                    clearInterval(m);
                }
            },100)

            let dCounter = 1
            const d = window.setInterval(() => {
                dCounter++;
                document.getElementById("day").innerHTML = dCounter;
                if (dCounter >= daysSince) {
                    clearInterval(d);
                }
            },100)
        }
    })

})