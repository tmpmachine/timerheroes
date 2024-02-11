let helper = (function() {
  
  let SELF = {
    ParseHmsToMs,
    ParseTimeStrToMs,
    ToTimeString,
    ClearObjectReference,
  };
  
  function ClearObjectReference(data) {
    return JSON.parse(JSON.stringify(data));
  }
  
  function ToTimeString(time, format) {
    if (format == 'hms') {
      return secondsToHMS( msToSeconds(time) );
    } else if (format == 'age') {
      return msToAge(time);
    }
    
    console.log('Time format not recognizable');
    return '';
  }
  
  function msToSeconds(milliseconds) {
    return Math.floor(milliseconds / 1000);
  }
  
  function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    let timeString = '';
  
    if (hours > 0) {
      timeString += `${hours}h`;
    }
  
    if (minutes > 0 || hours > 0) {
      timeString += `${minutes}m`;
    }
  
    if (remainderSeconds > 0 || (hours === 0 && minutes === 0)) {
      timeString += `${remainderSeconds}s`;
    }
  
    if (seconds === 0) {
      timeString = '0s';
    }
  
    return timeString;
  }
  
  function msToAge(ms) {
    const seconds = Math.floor(ms / 1000);
    const months = Math.floor(seconds / (3600 * 24 * 30));
    const days = Math.floor((seconds) / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    let timeString = '';

    if (days > 0 || months > 0) {
      timeString += `${days}days`;
      return timeString;
    }

    if (hours > 0 || days > 0 || months > 0) {
      timeString += `${hours}h`;
    }

    if (minutes > 0 || hours > 0 || days > 0 || months > 0) {
      timeString += `${minutes}m`;
    }

    if (remainderSeconds > 0 || minutes > 0 || hours > 0 || days > 0 || months > 0) {
      timeString += `${remainderSeconds}s`;
    }
    if (ms === 0) {
      timeString = '';
    }

    return timeString.trim(); // remove extra whitespace at the end
  }

  function ParseTimeStrToMs(timeString) {
    
    try {

      if (!timeString) {
        return null;
      }
      
      const regex = /^(\d+d)?(\d+h)?(\d+m)?$/;
      const match = regex.exec(timeString);
      
      let days = 0;
      let hours = 0;
      let minutes = 0;
      
      if (match[1]) {
        days = parseInt(match[1].slice(0, -1));
      }
      
      if (match[2]) {
        hours = parseInt(match[2].slice(0, -1));
      }
      
      if (match[3]) {
        minutes = parseInt(match[3].slice(0, -1));
      }
      
      return ( (days * 24 * 60) + (hours * 60) + minutes ) * 60 * 1000;
      
    } catch (e) {
      console.error(e);
    }
    
    return null;
    
  }
  
  function ParseHmsToMs(timeString) {
  
    if (!timeString) return 0;
  
    try {
      const regex = /^(\d+h)?(\d+m)?(\d+s)?$/;
      const match = regex.exec(timeString);
    
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
    
      if (match[1]) {
        hours = parseInt(match[1].slice(0, -1));
      }
    
      if (match[2]) {
        minutes = parseInt(match[2].slice(0, -1));
      }
    
      if (match[3]) {
        seconds = parseInt(match[3].slice(0, -1));
      }
    
      return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
      
    } catch (e) {
      throw e;
    }
    
    return 0;
    
  }
  
  return SELF;
  
})();