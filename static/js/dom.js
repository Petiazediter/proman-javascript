// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            let loadingScreen = document.querySelector("#boards");
            // add new board button instead of loading data
            loadingScreen.innerHTML =
                `
            <div class="boards-header">
            <button>Add new board</button>
            </div>`;

            dom.showBoards(boards);
        });
    },

    showBoards: function (boards) {
        for (let board of boards){
            dom.drawBoard(board);
        }
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features

    drawBoard: function (board) {
        let boardsContainer = document.querySelector('#boards');
        boardsContainer.classList.add("board-container");
        boardsContainer.innerHTML += `
            <section class="board" data-id = ${board.id}>
                <div class="board-header" data-id = ${board.id}>
                    <span class="board-title" data-id = ${board.id}></span>
                    <button class="board-add" data-id = ${board.id}>Add Card</button>
                    <button class="board-toggle" data-id = ${board.id}><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`;

        let container;
        for ( let element of document.getElementsByClassName('board-title')){
            if (element.dataset.id === `${board.id}`){
                container = element;
            }
        }

        const textBox = document.createElement('input');
        //<input type="text" value="${board.title}" class="boardName" data-id="${board.id}">
        textBox.setAttribute('class','boardName');
        textBox.setAttribute('value',board.title);
        textBox.dataset.id = board.id;
        textBox.onchange = function () {
            console.log('S');
            let value = this.value;
            dataHandler.renameBoard(board.id, value);
        };
        container.appendChild(textBox);

        dom.showStatusesOfBoard(board.id);
        dom.createCardFunction();
    },

    showStatusesOfBoard : function (boardID) {
        const boards = document.getElementsByClassName('board');
        for (let board of boards){
            if ( board.dataset.id == boardID){
                board.innerHTML += `<div class="board-columns"  id = "columns-${boardID}"></div>`;
                dataHandler.getStatuses(function (statuses) {
                    for (let status of statuses){
                        document.getElementById(`columns-${boardID}`).innerHTML += `
                            <div class="board-column">
                                <div class="board-column-title">${status.title}</div>
                                <div class="board-column-content" id="bcc-${status.id}-${boardID}"></div>
                            </div>`;
                        dom.loadCardsInStatus(boardID,status);
                    }
                });
            }
        }
    },

    loadCardsInStatus: function (boardID,status){
        dataHandler.getCardsInOrder(function (cardsInOrder) {
            const container = document.getElementById(`bcc-${status.id}-${boardID}`);
            container.innerHTML = "";
            for (let data of cardsInOrder){
                const div = document.createElement("div");
                div.setAttribute("class", "card");
                const titleDiv = document.createElement("div");
                titleDiv.setAttribute("class", "card-title");
                const title_input = document.createElement('input');
                titleDiv.appendChild(title_input);
                title_input.setAttribute( "value",data.title);
                container.appendChild(div);
                div.appendChild(titleDiv);
                title_input.onchange = function () {
                    let value = this.value;
                    dataHandler.renameCard(data.id, value);
                }
            }
        },boardID, status.id)
    },

    createCardFunction: function () {
        let allBoardAdds = document.querySelectorAll(".board-add");
        for (let board of allBoardAdds) {
            let boardId = board.dataset.id;

            function createCard() {
                dataHandler.createNewCard("new_card", `${boardId}`, 0, function(parameter) {
                    dom.loadCardsInStatus(`${boardId}`, {"id": 0});
                })
            }
            board.addEventListener("click", createCard);
        }
    },

    createBoardFunction: function () {
        const boardCount = document.querySelectorAll(".board")
        let counter = 0
        for (let boardNumber of boardCount) {
            counter += 1;
        }

        const newBoardID = counter + 1
        const newBoardTitle = `New title ${newBoardID}`

        function createNewBoard()


    },
    // here comes the new dom objects

};

