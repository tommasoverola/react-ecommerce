import CloseIcon from "../../assets/icons/CloseIcon";

type LoginRowProps = {
    onPressClose: () => void;
};
const LoginRow = (props: LoginRowProps) => {
    const { onPressClose } = props

    return (
        <div className="p-6 flex flex-row justify-between border-b border-variant2" >
            <span className="font-poppins text-base text-variant4 weigh font-semibold" >
                Log in
            </span>
            <div className="cursor-pointer" onClick={onPressClose} >
                <CloseIcon />
            </div>
        </div>
    )
}
export default LoginRow