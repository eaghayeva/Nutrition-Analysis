export const Nutrition = ({label, quantity, unit}) => {
    return (
        <div className='list'>
            <p className="li"><b>{label}</b> - {quantity} {unit}  </p>
        </div>
    )

}