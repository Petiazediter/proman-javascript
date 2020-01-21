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
            loadingScreen.innerHTML = "";
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
                    <span class="board-title">${board.title}</span>
                    <button class="board-add" data-id = ${board.id}>Add Card</button>
                    <button class="board-toggle" data-id = ${board.id}><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`;

        dom.showStatusesOfBoard(board.id);
    },

    showStatusesOfBoard : function (boardID) {
        const boards = document.getElementsByClassName('board');
        for (let board of boards){
            if ( board.dataset.id == boardID){
                board.innerHTML += `<div class="board-columns"  id = "columns-${boardID}"></div>`;
                dataHandler.getStatuses(function (statuses) {
                    for ( let status of statuses){
                        document.getElementById(`columns-${boardID}`).innerHTML += `

                            <div class="board-column">
                                <div class="board-column-title">${status.title}</div>
                                <div class="board-column-content" id="bcc-${status.id}-${boardID}"></div>
                            </div>      `;

                        dataHandler.getCardsInOrder(function (cardsInOrder) {
                            const container = document.getElementById(`bcc-${status.id}-${boardID}`);
                            for (let data of cardsInOrder){
                                const div = document.createElement("div");
                                div.setAttribute("class", "card");
                                const titleDiv = document.createElement("div");
                                titleDiv.setAttribute("class", "card-title");
                                titleDiv.innerHTML = data.title;
                                container.appendChild(div);
                                div.appendChild(titleDiv);
                            }

                        },boardID, status.id)
                    }




                })
            }
        }
    },
};
