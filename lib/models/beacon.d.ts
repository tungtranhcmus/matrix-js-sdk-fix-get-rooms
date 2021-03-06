import { BeaconInfoState, BeaconLocationState } from "../content-helpers";
import { MatrixEvent } from "../matrix";
import { TypedEventEmitter } from "./typed-event-emitter";
export declare enum BeaconEvent {
    New = "Beacon.new",
    Update = "Beacon.update",
    LivenessChange = "Beacon.LivenessChange",
    Destroy = "Beacon.Destroy",
    LocationUpdate = "Beacon.LocationUpdate"
}
export declare type BeaconEventHandlerMap = {
    [BeaconEvent.Update]: (event: MatrixEvent, beacon: Beacon) => void;
    [BeaconEvent.LivenessChange]: (isLive: boolean, beacon: Beacon) => void;
    [BeaconEvent.Destroy]: (beaconIdentifier: string) => void;
    [BeaconEvent.LocationUpdate]: (locationState: BeaconLocationState) => void;
    [BeaconEvent.Destroy]: (beaconIdentifier: string) => void;
};
export declare const isTimestampInDuration: (startTimestamp: number, durationMs: number, timestamp: number) => boolean;
export declare type BeaconIdentifier = string;
export declare const getBeaconInfoIdentifier: (event: MatrixEvent) => BeaconIdentifier;
export declare class Beacon extends TypedEventEmitter<Exclude<BeaconEvent, BeaconEvent.New>, BeaconEventHandlerMap> {
    private rootEvent;
    readonly roomId: string;
    private _beaconInfo;
    private _isLive;
    private livenessWatchInterval;
    private _latestLocationState;
    constructor(rootEvent: MatrixEvent);
    get isLive(): boolean;
    get identifier(): BeaconIdentifier;
    get beaconInfoId(): string;
    get beaconInfoOwner(): string;
    get beaconInfoEventType(): string;
    get beaconInfo(): BeaconInfoState;
    get latestLocationState(): BeaconLocationState | undefined;
    update(beaconInfoEvent: MatrixEvent): void;
    destroy(): void;
    /**
     * Monitor liveness of a beacon
     * Emits BeaconEvent.LivenessChange when beacon expires
     */
    monitorLiveness(): void;
    /**
     * Process Beacon locations
     * Emits BeaconEvent.LocationUpdate
     */
    addLocations(beaconLocationEvents: MatrixEvent[]): void;
    private clearLatestLocation;
    private setBeaconInfo;
    private checkLiveness;
}
//# sourceMappingURL=beacon.d.ts.map