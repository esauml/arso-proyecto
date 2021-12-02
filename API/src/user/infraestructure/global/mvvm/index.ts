import { Observable, Observer } from "../interface/index";

/**
 * The Model owns some important state and notifies observers when the state
 * changes.
 */
class Model implements Observable {

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    private observers: Observer[] = [];

    /**
     * The subscription management methods.
     */
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.observers.push(observer);
        console.log(': Attached an observer.');
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    /**
     * Trigger an update in each subscriber.
     */
    public notify(): void {
        console.log('Subject: Notifying subscribers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

/**
 * Abstract Observers react to the updates issued by the Subject they had been
 * attached to.
 */
abstract class ViewModel implements Observer{

    /**
     * 
     * @param Observable The Observable that sent a notification of change 
     * This is what will happen when Observable has changed
     */
    abstract update(Observable: Observable): void;
}

export { ViewModel, Model };