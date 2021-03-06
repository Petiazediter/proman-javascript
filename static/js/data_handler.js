// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        fetch(url, {
            method: 'POST',
            body:JSON.stringify({body:data})
        }).then((res) => res.json())
        .then(json_response =>  callback(json_response));
        // it is not called from outside
        // sends the data to the API, and calls callback function
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        this._api_get(`/get-board/${boardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCardsInOrder: function(callback,board_id, status_id){
        this._api_get(`/get-cards-by-status/${board_id}/${status_id}`, (response) =>{
            this._data = response;
            callback(response);
        })
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (callback) {
        // creates new board, saves it and calls the callback function with its data
        /*fetch(`http://127.0.0.1:5000/create-new-board/`)
        .then(response => callback(response));*/
        this._api_get(`/create-new-board/`, (response) =>{
            this._data = response;
            callback(response);
        })
    },
    createNewCard: function (cardTitle, boardId, statusId,callback) {
        // creates new card, saves it and calls the callback function with its data

        fetch(`http://127.0.0.1:5000/create-new-card/${boardId}/${statusId}/${cardTitle}`)
        .then(response => callback(response));
    },
    renameCard: function (cardID,newName,callback) {
        if (newName == ''){newName = " "}
         this._api_get(`/rename-card/card-${cardID}/text-${newName}/`, (response) =>{
            this._data = response;
            callback(response);
        })
    },
    renameBoard: function (boardID,newName,callback) {
        console.log(`${boardID} | ${newName}`);
        if (newName == ''){newName = " "}
        this._api_get(`/rename-board/board-${boardID}/text-${newName}/`, (response) =>{
            this._data = response;
            callback(response);
        })
    },
    removeCard: function (cardID, callback) {

        fetch(`http://127.0.0.1:5000/delete-card/${cardID}`)
            .then(response => callback(response));
    }
    // here comes more features
};
