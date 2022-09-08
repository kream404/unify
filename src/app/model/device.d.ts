export interface Device {

        id: string;
        name: string;
        is_active: boolean;
        is_private_session: boolean;
        is_restricted: boolean;
        type: string;
        volume_percent: number;
}
