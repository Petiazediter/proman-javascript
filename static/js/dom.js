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
                    <span class="board-title" data-id = ${board.id}><input type="text" value="${board.title}" class="boardName" id="board-title-${board.id}" data-boardId="${board.id}"></span>
                    <button class="board-add" data-id = ${board.id}>Add Card</button>
                    <button class="board-toggle" id="board-toggle-${board.id}" data-id = ${board.id}><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`;

        dom.showStatusesOfBoard(board.id);
        dom.createCardFunction();

        console.log(board.id)
        let inter = setTimeout(function () {
            document.getElementById(`board-toggle-${board.id}`).addEventListener('click',function () {
                dom.showHide(this)
            })
        },1000)

    },
    showHide : function(board){
        const boardID = board.dataset.id
        const element = document.getElementById(`columns-${boardID}`)
        if ( element.style.display == 'none' ){
            element.style.display = ''
            //dom.showStatusesOfBoard(boardID)
        }else{
            element.style.display = 'none'
        }
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
                //<div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                const delete_div = document.createElement('div');
                delete_div.setAttribute('class','card-remove');
                const _i = document.createElement('i');
                _i.setAttribute('class', 'fas fa-trash-alt');
                delete_div.setAttribute("data-card-id", data.id);
                delete_div.addEventListener("click", deleteThisCard);
                delete_div.appendChild(_i);
                div.appendChild(delete_div);
                title_input.onchange = function () {
                    let value = this.value;
                    dataHandler.renameCard(data.id, value);
                };

                function deleteThisCard() {
                    let card_id = this.dataset.cardId;
                    dataHandler.removeCard(card_id, function () {
                        dom.loadCardsInStatus(data.board_id, status)
                    });
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


}

setTimeout(function () {
    let elements = document.getElementsByClassName('boardName');
    for (let element of elements){
        element.onchange = function () {
            let value = this.value;
            dataHandler.renameBoard(this.dataset.boardid, value);
        }
    }
},1000)



