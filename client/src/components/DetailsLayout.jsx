import React, { useEffect, useState } from 'react'
import Wave from '../components/WaveLoader'

const DetailsLayout = ({ Ads, pageLoading, data, cast, filmsList }) => {

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (data.profile) {
            let elements = []; 
            elements.push(<h2 key="title" className="card-title text-3xl">Profile</h2>);
            data.profile.forEach((element, index) => {
                Object.entries(element).forEach(([key, value]) => {
                    elements.push(
                        <p key={index} className='text-lg capitalize'>
                            <span>{key}: </span>
                            <span>{value}</span>
                        </p>
                    );
                });
            });
            setProfile(elements);
            console.log(elements)
        }
    }, [data]);


    return (
        <div className='flex md:flex-row flex-col-reverse justify-around'>
            <div className='w-full md:w-1/5 bg-accent'>
                {Ads}
            </div>
            <div className="m-4 md:w-3/5">
                {pageLoading ? <Wave /> :
                    <div className='card w-full md:card-side md:flex-row-reverse bg-base-100 shadow-lg shadow-base-content px-4'>
                        <figure>
                            <img
                                src={data.image}
                                alt={data.title}
                                className='object-cover h-80 rounded-3xl'
                            />
                        </figure>
                        <div className="card-body">
                            <div id="profile" className=''>
                                {profile}
                            </div>


                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default DetailsLayout
