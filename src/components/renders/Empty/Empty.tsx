import './Empty.css'

interface Empty  {
    title: string;
    subtitle: string;
    image?: string;
}

const Empty = ({
    title,
    subtitle,
    image
}: Empty) => {
    return <div className='empty'>
        {
            image &&
            <img src={image} />
        }
        <h1>{title}</h1>
        <span>{subtitle}</span>
    </div>
}

export default Empty;
