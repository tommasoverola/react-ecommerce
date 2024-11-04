import LogoutIcon from "../../assets/icons/LogoutIcon";

type LoginRowProps = {
    onPressLogout: () => void;
};
const Logoutrow = (props: LoginRowProps) => {
    const { onPressLogout } = props

    return (
        <div className="p-6 flex flex-row justify-between cursor-pointer" onClick={onPressLogout}>
            <span className="font-poppins text-base text-variant4 weigh font-semibold" >
                Log out
            </span>
            <div className="cursor-pointer"  >
                <LogoutIcon />
            </div>
        </div>
    )
}
export default Logoutrow