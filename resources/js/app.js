// Storage Controller for the local storage
const StorageCtrl = (function() {
  // Public methods
  return {
    // 36) Store item in local storage
    storeItem: function(item) {
      let items;
      // Check if any items in local storage
      if(localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));
        // Push the new item
        items.push(item);
        // Re-set local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    // 37) Get items from local storage
    getItemsFromStorage: function() {
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    // 38) Update item in storage
    updateItemInStorage: function(updatedItem) {
      // Get what is already in local storage
      let items = JSON.parse(localStorage.getItem('items'));
      // Find the item that needs to be updated
      items.forEach(function(item, index) {
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      // Re-set local storage
      localStorage.setItem('items', JSON.stringify(items));
    },
    // 39) Delete item from storage
    deleteItemFromStorage: function(id) {
      // Get what is already in local storage
      let items = JSON.parse(localStorage.getItem('items'));
      // Find the item that needs to be updated
      items.forEach(function(item, index) {
        if(id === item.id) {
          items.splice(index, 1);
        }
      });
      // Re-set local storage
      localStorage.setItem('items', JSON.stringify(items));
    },
    // 40) Clear all items from local storage
    clearAllItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();



// Item Controller for the local data
const ItemCtrl = (function() {

  // 1) Item Constructor that we can add to the state, to the data constructor
  const Item = function(id, name, location, date) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.date = date;
  }

  // 2) Data Structure / State
  const data = {
    // Hard-coded data to work with
    // items: [
    //   {id: 0, name: 'Black Panther DVD', location: 'Under my bed', date: 'April 1st, 2018'},
    //   {id: 1, name: 'T-Shirt', location: 'Lent to Martina', date: 'April 6th, 2018'},
    //   {id: 2, name: 'Kindle', location: 'At the office', date: 'May 1st, 2018'},
    //   {id: 3, name: 'Ball', location: 'In the storage', date: 'May 6th, 2018'}
    // ],
    // 37) Get items from local storage
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    // currentItem is the item we clicked for updating
    totalItems: 0
  }

  // Public methods
  return {
    // 3) So we can access the data from the outside
    logData: function() {
      return data;
    },
    // 5) Returns the items we have in our data structure; we want this to load when our application initializes
    getItems: function() {
      return data.items;
    },
    // 16) Add the new item to the data structure
    addItem: function(name, location) {
      // First, we need to generate an ID
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Then we're getting today's date
      // let date = new Date().toJSON().slice(0, 10).replace(/-/g,'/');
      // this returns the date in the following format: yyyy/mm/dd

      // I'm using the following function instead, because it allows me to format the date to my preferences
      function getDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; // getMonth method returns the month of the date and is zero-based (0-January - 11-December)
        let months = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November','December'];
        let monthName = months[today.getMonth()];
        let yyyy = today.getFullYear();

        // if(dd<10) {
        //     dd = '0'+dd;
        // }
        // if(mm<10) {
        //     mm = '0'+mm;
        // }

        function getDaySuffix(num) {
          let array = ("" + num).split("").reverse(); // e.g. 123 = array("3", "2", "1")
          if (array[1] != "1") { // number is in the teens
              switch (array[0]) {
                  case "1": return "st";
                  case "2": return "nd";
                  case "3": return "rd";
              }
          }
          return "th";
        };

        // return today = mm + '/' + dd + '/' + yyyy;
        // return today = monthName + ' ' + dd + ', ' + yyyy;
        return today = monthName + ' ' + dd + getDaySuffix(dd) + ', ' + yyyy;
      }

      // Create new item
      newItem = new Item(ID, name, location, getDate());
      // Add the new item to the data structure, to the items array
      data.items.push(newItem);
      // Return the new item
      return newItem;
    },
    // 20) Get number of items
    getTotalItems: function() {
      let total = 0;
      // Set total equal to the length of the items array
      total = data.items.length;
      // Set total items in data structure
      data.totalItems = total;
      // Return total
      return data.totalItems;
    },
    // 24) Get item by id
    getItemById: function(id) {
      let found = null;
      // Loop through items
      data.items.forEach(function(item) {
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    // 25) Get current item
    getCurrentItem: function() {
      return data.currentItem;
    },
    // 31) Update item in data structure
    updateItem: function(name, location) {
      let found = null;
      // Loop through items
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.location = location;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      // Get ids
      const ids = data.items.map(function(item) {
        return item.id;
      });
      // Get the index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
    },
    // 34) Delete all items from data structure
    clearAllItems: function() {
      data.items = [];
    }
  }
  

})();



// UI Controller for anything to do with the ui
const UICtrl = (function() {

  // 8) An object that holds all the UI selectors in case some of the IDs or classes get changed in the HTML file, so we can just update them here in one place
  const UISelectors = {
    table: '#table',
    itemList: '#item-list',
    listItems: '#item-list tr',
    addBtn: '#rememberBtn',
    editBtn: '.editBtn',
    deleteBtn: '.deleteBtn',
    saveBtn: '.saveBtn',
    cancelBtn: '.cancelBtn',
    clearAllBtn: '.clearAllBtn',
    itemNameInput: '#item-name',
    itemLocationInput: '#item-location',
    totalItemsLabel: '#total-items',
    editNameInput: '#edit-name',
    editLocationInput: '#edit-location',
    modalOverlay: '.modal-overlay',
    modal: '.modal',
    filter: '#search'
  }

  // Public methods
  return {
    // 7) Method that populates UI with fetched items
    populateItemList: function(items) {
      // Loop through items; make each one into a tr item, and then insert it into the table
      let html = '';

      items.forEach(function(item) {
        // Append to the html variable with +=
        html += `
          <tr id="item-${item.id}" class="table-row">
            <td class="count"></td>
            <td>${item.date}</td>
            <td>${item.name}</td>
            <td>${item.location}</td>
            <td><i class="editBtn icon-pencil"></i> <i class="separator icon-minus"></i> <i class="deleteBtn icon-trash"></i></td>
          </tr>
        `;
      });

      // Insert table row items
      document.querySelector(UISelectors.itemList).innerHTML = html;

      // Increments the delay on each table row item
      const tr = document.querySelectorAll(UISelectors.listItems);
      let i;
      for (i = 0; i < tr.length; ++i) {
        let delay = (i / 4) + 's';
        tr[i].style.webkitAnimationDelay = delay;
        tr[i].style.mozAnimationDelay = delay;
        tr[i].style.animationDelay = delay;
      }
    },
    // 10) A public method so we can use the selectors outside this function
    getSelectors: function() {
      return UISelectors;
    },
    // 16) Returns an object with the name and the location the user has entered
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        location: document.querySelector(UISelectors.itemLocationInput).value
      }
    },
    // 30) Returns an object with the name and the location the user has entered for the edit state
    getEditedItemInput: function() {
      return {
        name: document.querySelector(UISelectors.editNameInput).value,
        location: document.querySelector(UISelectors.editLocationInput).value
      }
    },
    // 17) Add item to the UI table
    addListItem: function(item) {
      // Show the table
      document.querySelector(UISelectors.table).style.opacity = 1;
      // Create tr element
      const tr = document.createElement('tr');
      // Add ID
      tr.id = `item-${item.id}`;
      // Add class
      tr.className = 'table-row';
      // Add HTML
      tr.innerHTML = `
        <td class="count"></td>
        <td>${item.date}</td>
        <td>${item.name}</td>
        <td>${item.location}</td>
        <td><i class="editBtn icon-pencil"></i> <i class="separator icon-minus"></i> <i class="deleteBtn icon-trash"></i></td>
      `;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', tr);
    },
    // 18) Clear input fields
    clearInputFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemLocationInput).value = '';
    },
    // 19) Hide table if no entries
    hideTable: function() {
      document.querySelector(UISelectors.table).style.opacity = 0;
    },
    // 21) Add total items to UI
    showTotalItems: function(totalItems) {
      document.querySelector(UISelectors.totalItemsLabel).textContent = totalItems;
    },
    // 22) Clears after editing
    clearEditState: function() {
      // We need to make sure our inputs are clear
      document.querySelector(UISelectors.editNameInput).value = '';
      document.querySelector(UISelectors.editLocationInput).value = '';
    },
    // 26) Show item in the edit form
    addItemToEditForm: function() {
      document.querySelector(UISelectors.editNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.editLocationInput).value = ItemCtrl.getCurrentItem().location;
    },
    updateListItem: function(updatedItem) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn nodelist into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${updatedItem.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <td class="count"></td>
            <td>${updatedItem.date}</td>
            <td>${updatedItem.name}</td>
            <td>${updatedItem.location}</td>
            <td><i class="editBtn icon-pencil"></i> <i class="separator icon-minus"></i> <i class="deleteBtn icon-trash"></i></td>
          `;
        }
      })
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    // 35) Remove all items from UI
    removeAllItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      })
    }
  }

})();



// Main App where everything will meet and that's also where we put our inital event listeners and we also have our initializer, our init function there
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // 11) Get UI selectors; so we are able to use them in our AppCtrl
  const UISelectors = UICtrl.getSelectors();

  // 9) Load event listeners
  const loadEventListeners = function() {
    // 12) Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddsubmit);

    // 29) Disable submit on enter (just to be sure)
    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // 23) Edit icon click event && 32) Delete icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', editOrDeleteBtnClicked);

    // 27) Cancel icon click event
    document.querySelector(UISelectors.cancelBtn).addEventListener('click', cancelBtnClicked);

    // 28) Save updated icon click event
    document.querySelector(UISelectors.saveBtn).addEventListener('click', itemUpdateSubmit);

    // 33) Clear all icon click event
    document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllBtnClicked);

    // 41) Filter items event
    document.querySelector(UISelectors.filter).addEventListener('keyup', filterItems);
  }

  // 13) Add item submit
  const itemAddsubmit = function(e) {
    // console.log('Add');

    // 15) Get form input from UICtrl
    const input = UICtrl.getItemInput();
    // console.log(input);
    // Check for name and location input
    if(input.name !== '' && input.location !== '') {
      // 16) Add item
      const newItem = ItemCtrl.addItem(input.name, input.location);
      // 17) Add item to the UI table
      UICtrl.addListItem(newItem);
      // 20) Get total number of items
      const totalItems = ItemCtrl.getTotalItems();
      // 21) Add total items to UI
      UICtrl.showTotalItems(totalItems);
      // 36) Store in local storage
      StorageCtrl.storeItem(newItem);
      // 18) Clear input fields
      UICtrl.clearInputFields();
    }
    
    e.preventDefault();
  }

  // 23) Edit button clicked && 32) Delete button clicked
  const editOrDeleteBtnClicked = function(e) {
    // If clicked on edit
    if(e.target.classList.contains('editBtn')) {
      // Get item id (item-0, item-1, ...)
      const listId = e.target.parentNode.parentNode.id;
      // Break listId into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to edit form
      UICtrl.addItemToEditForm();
      // Open the modal
      document.querySelector(UISelectors.modalOverlay).classList.add('actived');
      document.querySelector(UISelectors.modal).classList.add('actived');
      // If clicked on delete
    } else if(e.target.classList.contains('deleteBtn')) {
      // Get item id (item-0, item-1, ...)
      const listId = e.target.parentNode.parentNode.id;
      // Break listId into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToDelete = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToDelete);
      // Get current item
      const currentItem = ItemCtrl.getCurrentItem();
      // Delete from data structure
      ItemCtrl.deleteItem(currentItem.id);
      // Delete from UI
      UICtrl.deleteListItem(currentItem.id);
      // 20) Get total number of items
      const totalItems = ItemCtrl.getTotalItems();
      // 21) Add total items to UI
      UICtrl.showTotalItems(totalItems);
      // 39) Delete from local storage
      StorageCtrl.deleteItemFromStorage(currentItem.id);
    }
    
    e.preventDefault();
  }

  // 27) Cancel button clicked
  const cancelBtnClicked = function() {
    // Close the modal
    document.querySelector(UISelectors.modalOverlay).classList.remove('actived');
    document.querySelector(UISelectors.modal).classList.remove('actived');
  }

  // 28) Save button clicked
  const itemUpdateSubmit = function(e) {
    // 30) Get edited item input
    const input = UICtrl.getEditedItemInput();
    // Update item in data structure
    const updatedItem = ItemCtrl.updateItem(input.name, input.location);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // 38) Update local storage
    StorageCtrl.updateItemInStorage(updatedItem);
    // Close the modal
    document.querySelector(UISelectors.modalOverlay).classList.remove('actived');
    document.querySelector(UISelectors.modal).classList.remove('actived');
    e.preventDefault();
  }

  // 33) Clear all button clicked
  const clearAllBtnClicked = function() {
    // 34) Delete all items from data structure
    ItemCtrl.clearAllItems();
    // 20) Get total number of items
    const totalItems = ItemCtrl.getTotalItems();
    // 21) Add total items to UI
    UICtrl.showTotalItems(totalItems);
    // 35) Remove all items from UI
    UICtrl.removeAllItems();
    // 40) Clear all items from local storage
    StorageCtrl.clearAllItemsFromStorage();
    // Hide the table header
    UICtrl.hideTable();
  }

  // 41) Filter items
  const filterItems = function(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".table-row").forEach(function(row) {
      const item = row.children[2].textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  return {
    // 4) Anything that we need to run right away when the application load goes in the init function
    init: function() {
      // 22) Clear edit state / set inital set
      UICtrl.clearEditState();

      // 6) From ItemCtrl calls the getItems method that gets all the items and uses the UICtrl to populate the list

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // 19) Check if any items
      if(items.length === 0) {
        // If no entries
        UICtrl.hideTable();
      } else {
        // Populate list with items (we're passing in the items we fetched from the ItemCtrl)
        UICtrl.populateItemList(items);
      }

      // 20) Get total number of items
      const totalItems = ItemCtrl.getTotalItems();
      // 21) Add total items to UI
      UICtrl.showTotalItems(totalItems);

      // 14) Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
AppCtrl.init();