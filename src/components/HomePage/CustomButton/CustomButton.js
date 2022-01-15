import './CustomButton.scss';

const CustomButton = ({ className, onClick }) => {
    return <button className={className} onClick={onClick} />;
};

export default CustomButton;
