const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
const detailsElement = document.getElementById('details');

// Special events data
const specialEvents = {
  '2023-01-25': 'Launch of the 2023 World Economic Situation and Prospects Report',
  '2023-02-06': 'UN Commission for Social Development',
  '2023-02-10': 'World Pulses Day',
  '2023-02-11': 'International Day of Women and Girls in Science',
  '2023-02-18': 'AU Summit',
  '2023-02-28': 'UN Statistical Commission',
  '2023-03-03': 'Africa Environment Day and Wangari Maathai Day',
  '2023-03-05': 'LDC5 Conference',
  '2023-03-06': 'UN Commission on the Status of Women',
  '2023-03-08': 'International Women’s Day',
  '2023-03-20': 'IPCC Synthesis Report',
  '2023-03-21': 'International Day of Forests',
  '2023-03-22': 'World Water Day',
  '2023-03-22': 'UN 2023 Water Conference',
  '2023-03-23': 'World Meteorological Day',
  '2023-03-25': 'Earth Hour',
  '2023-04-06': 'International Day of Sport for Development & Peace',
  '2023-04-07': 'World Health Day',
  '2023-04-10': 'UN Commission on Population and Development',
  '2023-04-17': 'Financing for Development Forum 2023',
  '2023-04-22': 'Earth Day',
  '2023-04-25': 'World Malaria Day',
  '2023-04-25': 'UN Permanent Forum on Indigenous Issues',
  '2023-04-28': 'International Girls in ICT Day',
  '2023-04-28': 'World Day for Safety and Health at Work',
  '2023-05-08': 'World Migratory Bird Day',
  '2023-05-18': 'Midterm Review of Sendai Framework for Disaster Risk Reduction',
  '2023-05-22': 'International Day for Biological Diversity',
  '2023-06-05': 'World Environment Day',
  '2023-06-08': 'World Oceans Day',
  '2023-06-17': 'World Day to Combat Desertification and Drought',
  '2023-06-18': 'Sustainable Gastronomy Day',
  '2023-06-23': 'UN Public Service Day',
  '2023-06-TBC': 'UN Public Service Awards',
  '2023-07-11': 'World Population Day',
  '2023-07-10': 'High-level Political Forum on Sustainable Development',
  '2023-07-15': 'World Youth Skills Day',
  '2023-07-24': 'UN Food Systems Stocktaking Moment',
  '2023-08-09': 'International Day of Indigenous Peoples',
  '2023-08-12': 'International Youth Day',
  '2023-08-19': 'World Humanitarian Day',
  '2023-09-12': '78th session of the UN General Assembly',
  '2023-09-18': 'High-Level Week of the UN General Assembly',
  '2023-09-18': 'Ministerial Meeting for the Summit of the Future',
  '2023-09-18': 'Climate Ambition Summit',
  '2023-09-19': '2023 SDG Summit',
  '2023-09-21': 'High-Level Meeting on Universal Health Coverage',
  '2023-10-08': 'Internet Governance Forum',
  '2023-10-11': 'International Day of the Girl Child',
  '2023-10-15': 'International Day of Rural Women',
  '2023-10-16': 'World Food Day',
  '2023-10-17': 'International Day for the Eradication of Poverty',
  '2023-10-24': 'UN Day',
  '2023-10-31': 'World Cities Day',
  '2023-11-06': 'COP28',
  '2023-11-20': 'Africa Industrialization Day',
  '2023-11-25': 'International Day for the Elimination of Violence Against Women',
  '2023-12-01': 'World AIDS Day',
  '2023-12-03': 'International Day of Persons with Disabilities',
  '2023-12-10': 'Human Rights Day'
};

// getting new date, current year, and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let fullDate = `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        let isSpecial = specialEvents.hasOwnProperty(fullDate) ? "special-event" : "";
    
        liTag += `<li class="${isToday} ${isSpecial}" onclick="showDetails('${fullDate}')">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

const showDetails = (selectedDate) => {
    const eventDetails = specialEvents[selectedDate];
    detailsElement.textContent = eventDetails || 'No details available for this date';
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});


  
