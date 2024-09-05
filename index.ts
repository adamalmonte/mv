import { Rover, RoverInput, Direction, Instruction } from "./RoverClass";

type ProcessedInput = {
    maxX: number;
    maxY: number;
    rovers: RoverInput[];
}

const processInput = (input: string): ProcessedInput => {
    /**
     * 
        `4 8
        (2, 3, E) LFRFF
        (0, 2, N) FFLFRFF`.split('\n');
        =
        [ '4 8 ', '(2, 3, E) LFRFF ', '(0, 2, N) FFLFRFF' ]
     */
    // split input on newline
    const inputLines = input.split('\n');
    // remove first line from input, trim whitespace, split on space to get x and y
    const [maxX, maxY] = inputLines.shift().trim().split(' ');

    // remaining lines in input are Rover instances and instructions.
    // '        (2, 3, E) LFRFF'
    // => .trim() = '(2, 3, E) LFRFF'
    // => .split(") ") = [ '(2, 3, E', 'LFRFF' ]
    // then remove opening parenthesis and split first element to get x, y, and direction
    // map into array of objects:
    // [ { xPos: 2, yPos: 3, direction: "E", instructions: [L,F,R,F,F] }, ...]
    const rovers: RoverInput[] = inputLines.map((line) => {
        const [tempPos, tempIns] = line.trim().split(") ");
        const position = tempPos.substring(1, tempPos.length);
        const [xPos, yPos, direction] = position.split(", ");

        const instructions = tempIns.split('');

        return ({
            xPos: Number(xPos),
            yPos: Number(yPos),
            direction: (direction as Direction),
            instructions: (instructions as Instruction[]),
        });
    });

    return {
        maxX: Number(maxX),
        maxY: Number(maxY),
        rovers
    };
};

const generateOutput = (input: string) => {
    console.log("\n");
    console.log(`*** TEST CASE: ***`)
    console.log(input);
    console.log("\n");

    const { maxX, maxY, rovers: roverInputs } = processInput(input);

    console.log(`RESULT:`);
    for (let input of roverInputs) {
        const { xPos, yPos, direction, instructions } = input;
        const rover = new Rover({xPos, yPos, direction, maxX, maxY});

        let result;

        for (let instruction of instructions) {
            result = rover.move(instruction);
            if (result.lost) {
                break;
            }
        }
        
        console.log(`(${result.xPos}, ${result.yPos}, ${result.direction})${result.lost ? ' LOST' : ''}`);
    }
}

const TESTCASE_1 = `4 8
        (2, 3, E) LFRFF
        (0, 2, N) FFLFRFF`;

const TESTCASE_2 = `4 8 
(2, 3, N) FLLFR 
(1, 0, S) FFRLF`;

generateOutput(TESTCASE_1);
generateOutput(TESTCASE_2);