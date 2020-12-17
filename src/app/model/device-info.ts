export interface DeviceInfo {
    isNative: boolean | undefined;
    platform: string;
    fingerPrintAviable: boolean;
    isFingerPrintRegistered: boolean;
    device: string;
    sistemaOperativo: string | null;
    userAgent: string;
}

export interface PositionCoordinate {
    latitudine: number;
    longitudine: number;
}

export interface APICall {
    actionName: string;
    timestamp: string;
}


