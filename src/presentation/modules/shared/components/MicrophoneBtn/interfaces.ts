import { StyleProp, ViewStyle } from 'react-native';

export interface MicrophoneBtnProps {
    conditionForNotRecording?: boolean;
    onNotRecording?: () => void;
    onRecord: (record: string) => void;
    style?: StyleProp<ViewStyle>;
}