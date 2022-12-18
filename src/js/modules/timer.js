const timer = () => {
  function counterInit({ selectorDays, selectorHours, selectorMinutes, selectorSeconds, timeToStop }) {
    const elemDays = document.querySelector(selectorDays),
        elemHours = document.querySelector(selectorHours),
        elemMinutes = document.querySelector(selectorMinutes),
        elemSeconds = document.querySelector(selectorSeconds);
    
    let stopCounter = false;

    changeCounter();
    startTimer();
    

    function startTimer() {
      const counterId = setInterval(() => {
        if (stopCounter) {
          clearInterval(counterId);
          
          counterInit({ selectorDays: '#days', 
          selectorHours: '#hours', 
          selectorMinutes: '#minutes',
          selectorSeconds: '#seconds',
          timeToStop: new Date().setHours(23, 59, 59, 999),
        });

          return;
        }

      changeCounter();

      }, 1000);
    }

    function getTimeRemaining() {
      const diffDateInSec = ( timeToStop - Date.now() ) / 1000;
      let days, hours, minutes, seconds;
      
      if (diffDateInSec <= 0) {
        days = 0; 
        hours = 0; 
        minutes = 0; 
        seconds = 0;
        stopCounter = true;
  
      } else {
        days = Math.floor( ( (diffDateInSec / 60 / 60) / 24) );
        hours =  Math.floor( ( (diffDateInSec / 60 / 60) % 24) );
        minutes = Math.floor( (diffDateInSec / 60) % 60 );
        seconds = Math.floor( diffDateInSec % 60 );
      }
  
      return {
        days,
        hours,
        minutes,
        seconds
      };
    }

    function changeCounter() {
      const timeRemaining = getTimeRemaining();

      elemDays.textContent     = timeRemaining.days < 10 ? `0${timeRemaining.days}` : timeRemaining.days;
      elemHours.textContent    = timeRemaining.hours < 10 ? `0${timeRemaining.hours}` : timeRemaining.hours;
      elemMinutes.textContent  = timeRemaining.minutes < 10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes;
      elemSeconds.textContent  = timeRemaining.seconds < 10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds;
    }

  }

  counterInit({ selectorDays: '#days', 
                selectorHours: '#hours', 
                selectorMinutes: '#minutes',
                selectorSeconds: '#seconds',
                timeToStop: new Date().setHours(23, 59, 59, 999),
              });
          
};

export default timer;