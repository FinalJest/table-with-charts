interface OrderButtonProps {
    isDescending: boolean;
    onClick(): void;
}

export default function OrderButton(props: OrderButtonProps) {
    return (
        <button onClick={props.onClick}>{props.isDescending ? "Desc." : "Asc."}</button>
    );
}
