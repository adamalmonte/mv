export type Direction = "N" | "S" | "E" | "W";
export type Instruction = "L" | "R" | "F";

interface RoverPosition {
    xPos: number;
    yPos: number;
    direction: Direction;
}

// Input string e.g. "LFRFF"
export interface RoverInput extends RoverPosition{
    instructions: Instruction[];
}

// Props for Rover class
interface RoverProps extends RoverPosition {
    lost?: boolean;
    readonly maxX: number;
    readonly maxY: number;
}

export class Rover {
    xPos: number;
    yPos: number;
    direction: Direction;
    lost: boolean;
    private maxX: number;
    private maxY: number;

    constructor({ xPos, yPos, direction, lost = false, maxX, maxY }: RoverProps) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.direction = direction;
        this.lost = lost;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    move(instruction: Instruction) {
        switch(instruction) {
            case "L":
                if (this.direction === "N") {
                    this.direction = "W";
                } else if (this.direction === "S") {
                    this.direction = "E";
                } else if (this.direction === "E") {
                    this.direction = "N";
                } else { // W
                    this.direction = "S";
                }

                break;
            case "R":
                if (this.direction === "N") {
                    this.direction = "E";
                } else if (this.direction === "S") {
                    this.direction = "W";
                } else if (this.direction === "E") {
                    this.direction = "S";
                } else { // W
                    this.direction = "N";
                }

                break;
            case "F":
                if (this.direction === "N") {
                    if (this.yPos === this.maxY) {
                        this.lost = true;
                        break;
                    } else {
                        this.yPos += 1;
                    }
                } else if (this.direction === "S") {
                    if (this.yPos === 0) {
                        this.lost = true;
                        break;
                    } else {
                        this.yPos -= 1;
                    }
                } else if (this.direction === "E") {
                    if (this.xPos === this.maxX) {
                        this.lost = true;
                        break;
                    } else {
                        this.xPos += 1;
                    }
                } else { // W
                    if (this.xPos === 0) {
                        this.lost = true;
                        break;
                    } else {
                        this.xPos -= 1;
                    }
                }                

                break;
            default:
                // do nothing
                break;
        }
        return { xPos: this.xPos, yPos: this.yPos, direction: this.direction, lost: this.lost };
    }
}