import { Grid, GridSquare } from '../import-manager.js';
import { Maybe } from '../util/typescript-helpers.js';

interface RouteAssessment {
    square: GridSquare;
    previous: Maybe<RouteAssessment>;
    distance: number;
};

function absolueClosenessOf(square1: GridSquare, square2: GridSquare): number {
    return (Math.abs(square2.x - square1.x) + Math.abs(square2.y - square1.y));
}

export function getRoute(from: GridSquare, to: GridSquare): GridSquare[] {
    let assessedSquareRefs: boolean[] = [];
    let assessments: RouteAssessment[] = [{ square: to, previous: null, distance: absolueClosenessOf(to, from) }];

    function canditateNeighboursOf(square: GridSquare): GridSquare[] {
        return square.getAllNeighbours().filter((n) => {
           return n.walkable && !assessedSquareRefs[n.refNumber];
        });
    }

    function assess(previous: RouteAssessment) {
        const candidates = canditateNeighboursOf(previous.square);
        candidates.forEach((candidate) => {
            assessments.push({
                square: candidate,
                previous,
                distance: absolueClosenessOf(candidate, from),
            });
        });
        assessedSquareRefs[previous.square.refNumber] = true;
        assessments.splice(assessments.findIndex((a) => a.square.refNumber === previous.square.refNumber), 1);
    }

    function getNextToAssess(): Maybe<RouteAssessment> {
        let next: Maybe<RouteAssessment> = null;
        for (let i = 0; i < assessments.length; i += 1) {
            if (assessments[i].square.refNumber === from.refNumber) {
                return assessments[i];
            }
            if (!next || assessments[i].distance < next.distance) {
                next = assessments[i];
            }
        }
        return next;
    }

    while (!assessedSquareRefs[from.refNumber] && assessments.length > 0) {
        const next = getNextToAssess();
        if (next?.square.refNumber === from.refNumber) {
            assessedSquareRefs[from.refNumber] = true;
            break;
        }
        if (next) {
            assess(next);
        } else {
            break;
        }
    }

    if (assessedSquareRefs[from.refNumber]) {
        let result = [];
        let current: Maybe<RouteAssessment> = assessments.find((a) => a.square.refNumber === from.refNumber);

        while (current) {
            result.push(current.square);
            current = current?.previous;
        }

        return result;
    } else {
        return [];
    }

}