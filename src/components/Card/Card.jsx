const Card = ({
  className,
  heading,
  bigNumber,
  smallNumber,
  primaryInfo,
  secondaryInfo,
  imageSrc,
  altImageText
}) => {
  return (
    <div className={`${className} card`}>
      <h3 className='card-heading'>{heading}</h3>
      <p className='big-number'>{bigNumber}</p>
      <span className='small-number'>{smallNumber}</span>
      <p className='primary-info'>{primaryInfo}</p>
      <p className='secondary-info'>{secondaryInfo}</p>

      <DataVisualisation imageSrc={imageSrc} altText={altImageText} />
    </div>
  );
};

export default Card;
