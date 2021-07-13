
export interface IVector {
    x?: number;
    y?: number;
}

export class Vector implements IVector{
    x: number;
    y: number;

    constructor(v: IVector) {
        this.x = v.x ?? 0;
        this.y = v.y ?? 0;
    }

    static getRandomVector(max?: IVector): Vector {
        return new Vector({
            x: Math.random()* (max?.x || 1),
            y: Math.random()* (max?.y || 1)
        });
    }

    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    minus(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multByScalar(scalar: number): Vector {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    lenght(): number {
        return Math.sqrt( this.x**2 + this.y**2 );
    }

    normalize(): Vector {
        const tmpL = this.lenght();
        this.x /= tmpL;
        this.y /= tmpL;
        return this;
    }

    distanceTo(other: Vector): number {
        return Math.sqrt( (this.x-other.x)**2 + (this.y-other.y)**2 );
    }
 
}