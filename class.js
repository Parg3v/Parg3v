class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.multiply = 0;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {

            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grEaterArr.push(newGrassEater);
            grassArr.slice(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
        }
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        } return found;

    }

    move() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(1);
        var newCell = random(GrCells);
        if (newCell) {
            // sound
            if (!NoSounds) {
                grEaterSounds.setVolume(0.1 * volume);
                grEaterSounds.play();
            }
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.mul()

        } else if (this.energy > 0) {
            this.move();

        } else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grEaterArr) {
            if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
                grEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.multiply = 0;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {

            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            grEaterArr.slice(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        } return found;

    }

    move() {
        this.getNewCoordinates()
        var newCell = random(this.chooseCell(0));
        var grCells = random(this.chooseCell(1));
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else if (grCells) {
            this.energy--;
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrEaterCells = this.chooseCell(2);
        var newCell = random(GrEaterCells);
        if (newCell) {

            // sounds
            if (!NoSounds) {
                pred.setVolume(0.5 * volume);
                pred.play();
            }

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grEaterArr) {
                if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul()

        } else if (this.energy > 0) {
            this.move();

        } else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}

class Box {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.time = 0;
        this.index = index;
        this.directions = [];
        this.color = "red";
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    Generate() {
        this.getNewCoordinates();
        this.time++;
        if (this.time == 1 && !NoSounds) {
            box1.setVolume(0.01 * volume);
            box1.play();
        } else if (this.time < 10) {
            this.color = "red";
        }
        else if (this.time == 10) {
            if (!NoSounds) {
                box2.setVolume(0.01 * volume);
                box2.play();
            }
            this.color = "orange";
        }
        else if (this.time == 20) {
            if (!NoSounds) {
                box3.setVolume(0.01 * volume);
                box3.play();
            }
            this.color = "yellow";
        }
        else if (this.time >= 30) {
            this.Randoming();
            this.time = 0;
        }

    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        } return found;

    }

    Randoming() {
        var newCell = random(this.chooseCell(0));
        var newCellGrass = random(this.chooseCell(1));
        if (newCell) {
            var char = random(1, 4);

            char = parseInt(char);

            if (char == 1) {
                var newPredatorA = new Predator(newCell[0], newCell[1], 3);
                predatorArr.push(newPredatorA);
                matrix[newCell[1]][newCell[0]] = 3;
            }
            else if (char == 2) {
                var newGrassEaterA = new GrassEater(newCell[0], newCell[1], 2);
                grEaterArr.push(newGrassEaterA);
                matrix[newCell[1]][newCell[0]] = 2;
            }
            else if (char == 3) {
                var newGrassA = new Grass(newCell[0], newCell[1], 1);
                grassArr.push(newGrassA);
                matrix[newCell[1]][newCell[0]] = 1;
            }
            else if (i == 5) {
                boxArr.length = 0;
            }
        }






        else if (newCellGrass) {
            var char = random(1, 4);

            char = parseInt(char);

            if (char == 1) {
                var newPredatorA = new Predator(newCellGrass[0], newCellGrass[1], 3);
                predatorArr.push(newPredatorA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 3;
            }
            else if (char == 2) {
                var newGrassEaterA = new GrassEater(newCellGrass[0], newCellGrass[1], 2);
                grEaterArr.push(newGrassEaterA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 2;
            }
            else if (char == 3) {
                var newGrassA = new Grass(newCellGrass[0], newCellGrass[1], 1);
                grassArr.push(newGrassA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 1;
            }
            else if (i == 5) {
                boxArr.length = 0;
            }
        }
    }
}

class Destroyer {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.color = "#0051ff";
        this.time = 0;
        this.id = random(1, 3);
        this.id = parseInt(this.id);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    starting() {
        this.time++;
        if (this.time < 10) {
            this.color = "#0051ff";
        } else if (this.time == 10) {
            this.color = "#0095ff"
        } else if (this.time == 20) {

            //sounds
            if (!NoSounds) {
                destSounds.setVolume(20 * volume);
                destSounds.play();
            }


            this.color = "#00aeff";
        } else if (this.time >= 30) {
            this.eat();
        }
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        } return found;

    }

    move() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(this.id);

        if (this.id == 1) {
            var newCell = random(GrCells);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.energy > 0) {
                this.move();
            } else {
                this.die();
            }
        } else if (this.id == 2) {
            var GrEaterCells = this.chooseCell(2);
            var newCell = random(GrEaterCells);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grEaterArr) {
                    if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                        grEaterArr.splice(i, 1);
                        break;
                    }
                }

            } else if (this.energy > 0) {
                this.move();

            } else {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in DestArr) {
            if (this.x == DestArr[i].x && this.y == DestArr[i].y) {
                DestArr.splice(i, 1);
                break;
            }
        }
    }
}