// TIC TAC TOE
const tic_tac_toe = {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                turn_index: 0,
                change(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    container_element: null,
    table: null,
    gameover: false,
    plays: 0,
    round: 1,
    game_count: 0,
    score: [[0, 0, 0, '-']],
    x_score: 0,
    o_score: 0,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNCTIONS
    init(container, table) {
        this.container_element = container;
        this.table = table;
        this.draw_table();
    },

    make_play(position) {
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();

        this.plays++;

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        // if (this.is_game_over()){
        //     this.game_is_over();
        // }

        // console.log(this.symbols.turn_index);

        if (winning_sequences_index >= 0) {
            if(this.symbols.turn_index === 0) {
                document.getElementsByClassName('winn')[0].innerHTML ="O WINS";
                document.getElementsByClassName('winn')[0].classList.add("green");
                this.score[this.round-1][0]++;
            } else {
                document.getElementsByClassName('winn')[0].innerHTML ="X WINS";
                document.getElementsByClassName('winn')[0].classList.add("green");
                this.score[this.round-1][1]++;
            }

            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);

        } else {
            this.symbols.change();
            if(this.plays == 9)
            {
                document.getElementsByClassName('winn')[0].innerHTML= "GAME DRAWN";
                this.score[this.round-1][2]++;
                document.getElementsByClassName('winn')[0].classList.add("green");
                document.getElementsByClassName('winn')[0].classList.add("red");
                this.game_is_over();
            }
            else
                document.getElementsByClassName('winn')[0].innerHTML= this.symbols.turn_index === 0 ? "O Turn": "X Turn";
        }

        return true;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        this.game_count++;
        console.log('GAME OVER');
        console.log('game count ', this.game_count);
        
        console.log(this.score);
        
        if(this.game_count === 3){
            this.game_count = 0;
            if(this.score[this.round-1][0] > this.score[this.round-1][1]) 
                this.score[this.round-1][3] = 'O';
            else if(this.score[this.round-1][0] == this.score[this.round-1][1])
                this.score[this.round-1][3] = 'DRAW';
            else
                this.score[this.round-1][3] = 'X';

            this.score.push([0, 0, 0, '-']);
            this.round++;
        }
        
        this.draw_table();
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;
        this.plays = 0;
    },

    restart_game() {
        console.log("restart game");
        if(confirm('Are you sure you want to restart the game?')) {
            this.start()
            document.getElementsByClassName('winn')[0].innerHTML = this.symbols.turn_index === 0 ? "O Turn": "X Turn";
            document.getElementsByClassName('winn')[0].classList.remove("green");
            document.getElementsByClassName('winn')[0].classList.remove("red");
            this.round = 1;
            this.score = [[0, 0, 0, '-']];
            this.game_count = 0;
            this.draw_table();
        }
    },
    restart_round() {
        console.log("restart round");
        if(confirm('Are you sure you want to restart this round?')) {
            this.start()
            document.getElementsByClassName('winn')[0].innerHTML = this.symbols.turn_index === 0 ? "O Turn": "X Turn";
            document.getElementsByClassName('winn')[0].classList.remove("green");
            document.getElementsByClassName('winn')[0].classList.remove("red");
            this.score[this.round-1] = [0, 0, 0, '-'];
            this.game_count = 0;
            this.draw_table();
        }
    },
    reset_board() {
        console.log("reset board");

        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('this game has been restarted!');
        } else if (confirm('Are you sure you want to reset this board?')) {
            this.start();
            console.log('this game has been restarted!');
        }
        
        document.getElementsByClassName('winn')[0].innerHTML = this.symbols.turn_index === 0 ? "O Turn": "X Turn";
        document.getElementsByClassName('winn')[0].classList.remove("green");
        document.getElementsByClassName('winn')[0].classList.remove("red");
    },
    
    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },

    draw_table() {
        console.log("Drawing - Table")

        let r = 1;
        this.table.innerHTML = this.score.map((ele) => `<tr> <td> ${r++} </td>  ${ele.map((e) => `<td> ${e} </td>`).join('')} </tr>` ).join('')
    }
};