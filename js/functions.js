console.log("hej");
// G
// CODE According to specification
function click_filter_element (event) {

  const selectedElement = event.target;

  selectedElement.classList.toggle("selected");

  update_programmes();

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
}

// G
// CODE according to specification
function create_filter_element (data) {

  const filterElement = document.createElement("li");

  filterElement.className = data.class
  data.parent.appendChild(filterElement);

  filterElement.textContent = data.textContent;
  filterElement.addEventListener("click", click_filter_element);

  return filterElement;
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


//// VG
//// CODE according to specification
//function add_group_toggling (filter_container_dom) {
//
//  /*
//    ARGUMENT
//      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
//            Exempel: the <ul> that contains the filters for Language.
//
//    SIDE EFFECTS
//      The function makes sure that when the user clicks on filter_container_dom, all the
//      filter_elements that it contains are selected / unselected.
//      Since some filter elements will have changed after the click, the list of
//      programmes must be updated.
//
//    NO RETURN VALUE
//
//  */
//  
//}


//// VG
//// CODE according to specifications
//function toggle_cities (event) {
//
//  /*
//
//    ARGUMENTS
//      This function does not take any arguments
//
//    SIDE EFFECTS
//      This function checks the state of the first city-filter-element (Madrid).
//      If it is selected then it de-selects ALL city-filter-elements
//      If it is de-selected then it selects ALL city-filter-elements 
//
//    NO RETURN VALUE
//
//  */
//
//}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters () {

/*
Arguments: This function does not take any arguments

Side effects: This function creates a list out of country filter
and city filter in dom. Country filter exists in a div-element named "country" (class)
and with the ID country_<country.id>. The city filter exists in a ul-element inside the 
div-elmement of that specific country. City filter is created by calling the create_city 
function for every city in the array "CITIES". Both country filter and city filter 
is appended to the element #country_filter > ul in dom. 

No return value
*/
  function create_country (country) {

  /*
    Arguments: 
    city: is an object representing a country and has the following keys:
    id: the ID of the country
    name: is the name of the country

    Side effects: This function creates a list out of country filter in dom which
    is a div-element called "country" (class) and with the ID country_<country-id>.
    Country filter contains a h1-element which in turn contains country.name 
    and one ul-element. This ul-element contains the city filter for the specific
    country. The country filter is added to #country_filter > ul in dom. 

    No return value
  */
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

  /*
    Arguments:
    city: an object representing a country with following keys:
      id: the ID of the city
      countryID: the ID of the country the city belongs to
      name: the name of the city

    Side effects: This function creates a city filter in dom. City filter
    is a li-element named "selected" (class) with its data attrinute 
    "data-id" set to "city.id". The city filter contains city.name and is added
    to the ul-element inside the div-element containing its specific country, 
    decided by city.countryID.

    No return value
  */
    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter () {
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}

function createFilterForAll (objectArray, filterKind) {

  /*
  Arguments: 
    objectArray: an array of objects where the filter elements will be created
    filterKind: the ID of the dom-elements where the filter elements will be

  Side effects: Appends filter elements to the specific dom-element
  Adds thr class "selected" to each filter element
  Sets the data-id attribute of each filter element to the id-property of the 
  related object in the objectArray
  Sets the text-content of each filter element to the "name" of the related
  object in the objectArray

  No return values
  */

  const filterDom = document.querySelector(`#${filterKind}_filter > ul`);

  objectArray.forEach(objectArray => {
    const filterElement = document.createElement("li");

    filterElement.classList.add("selected");
    filterElement.dataset.id = objectArray.id;
    filterElement.textContent = objectArray.name;

    filterDom.appendChild(filterElement);
  });
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {

  const programmeElement = document.createElement("div");
  programme.classList.add("programme");

  const titleElement = document.createElement("h2");
  titleElement.textContent = programme.title;
  programmeElement.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = programme.description;
  programmeElement.appendChild(descriptionElement);
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  

}


// G
// CODE according to the specification
function update_programmes () {

  const updateProgrammes = document.querySelector("#programmes > ul");
  updateProgrammes.innerHTML = ``;

  const programmes = read_filters();

  if (programmes.length !== 0) {
    const paragraph = document.querySelector("#programmes > p");
    paragraph.innerHTML = ``;
  } else {
    const paragraph = document.querySelector("#programmes > p");
    paragraph.innerHTML = `Inga program uppfyller nuvarande filter.`;
  }

  array_each(programmes, create_programme);

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {

  /*
  No arguments

  Side effects: 
  This function reads the condition för the filter elements in DOM and return an array of programmes that
  are to be shown based on the chosen filter.
  * callback_add_cityID reads the chosen city filter elements and adds the related city ID to the city_id_selected array
  * callback_add_programmes changes the "programmes"-attay by adding the related prgrmans
  * callback_add_levelID changes the level_id_selected-array by adding the level ID
  * callback_add_languageID changes the language_id_selected-array by adding the language ID
  * callback_add_subjectID changes the subject_id_selected-array by adding the subject ID
  * test_function_level tests if the given programme matches the selected language
  * test_function_subject tests if the given programme matches the selected subjects
  * test_function tests is a given program's name includes the search string

  Return value:
  These functions return a couple of programmes that are to be displayed based on the chosen filter
  */
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
