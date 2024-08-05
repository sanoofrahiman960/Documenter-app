declare module "react-native-config" {
    interface Env {
        ICON_FONT_FAMILY: string;
        // Add other environment variables here
    }

    const Config: Env;

    export default Config;
}
