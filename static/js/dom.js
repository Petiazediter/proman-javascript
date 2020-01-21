// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        /*
        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `; */




        for (let board of boards){
            dom.drawBoard(board);
        }



        //boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
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
        boardsContainer.innerHTML += `
            <section class="board" data-id = ${board.id}>
                <div class="board-header" data-id = ${board.id}>
                    <span class="board-title">${board.title}</span>
                    <button class="board-add" data-id = ${board.id}>Add Card</button>
                    <button class="board-toggle" data-id = ${board.id}><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`

        dom.showCardsOfBoard(board.id);
    },

    showCardsOfBoard : function (boardID) {
        const boards = document.getElementsByClassName('board');
        for (let board of boards){
            if ( board.dataset.id == boardID){
                board.innerHTML += `<div class="board-columns"  id = "columns-${boardID}"></div>`
            }
        }
    },
};
