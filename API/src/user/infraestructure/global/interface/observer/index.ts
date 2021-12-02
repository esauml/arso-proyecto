/**
 * The Observable interface declares a set of methods for managing subscribers.
 */
interface Observable {
    // Attach an observer to the subject.
    attach(observer: Observer): void;

    // Detach an observer from the subject.
    detach(observer: Observer): void;

    // Notify all observers about an event.
    notify(): void;
}

/**
 * The Observer interface declares the update method, used by subjects.
 */
interface Observer {
    // Receive update from subject.
    update(Observable: Observable): void;
}

export {Observable, Observer};