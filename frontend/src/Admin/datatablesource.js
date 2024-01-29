export const userColumns = [




     {
        field:"id",
        headerName:"ID",
        width:70
    },
    {
        field:"user",
        headerName:"User",
        width:230,
        renderCell:(params)=>{
            return(
                <div className="cellWithImg">
                    <img className="imgCell" src={params.row.img} alt="avatar" />
                    {params.row.username}
                </div>
            )
        }
    },
    {
        field:"email",
        headerName:"Email",
        width:300
    },
    {
        field:"status",
        headerName:"Status",
        width:100,
        renderCell:(params)=>{
            return(
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
    },
    {
        field:"age",
        headerName:"Age",
        with:150
    }
    
]














export const userRows = [
    {
        id: 1,
        username: "Potter",
        img: "https://www.irishtimes.com/resizer/SmxgbQ6uare8cwxz0bGi94tWcPM=/1600x1600/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/3MS3PYEKJI2N533Z3ZG6VJ2RKU.jpg",
        status: "active",
        email: "boywholived@owls.com",
        age: 20
    },
    {
        id: 2,
        username: "Granger",
        img: "https://miro.medium.com/v2/resize:fit:768/1*obDCz57X7D2Kd1XvcdI0Iw.jpeg",
        status: "active",
        email: "brightestwitch@hogwarts.com",
        age: 21
    },
    {
        id: 3,
        username: "Weasley",
        img: "https://images.ctfassets.net/usf1vwtuqyxm/5Xpzr1HK3TCNJOTBvD2okc/a16952f5548e490a91e9f78e1be97caa/HP-F6-half-blood-prince-ron-pyjamas-smirking-love-potion-web-landscape",
        status: "active",
        email: "ronfan@quidditch.net",
        age: 19
    },
    {
        id: 4,
        username: "Dumbledore",
        img: "https://consequence.net/wp-content/uploads/2023/09/Michael-Gambon-Dumbledore.jpeg",
        status: "active",
        email: "headmaster@hogwarts.com",
        age: 150
    },
    {
        id: 5,
        username: "Snape",
        img: "https://images.ctfassets.net/usf1vwtuqyxm/toxlayPDePtX8yx2wvWun/b65f6acd9087031b1ff39461d8f22d0a/severus-snape_2_1800x1248.png",
        status: "inactive",
        email: "potionsmaster@hogwarts.com",
        age: 38
    },
    {
        id: 6,
        username: "Luna",
        img: "https://qph.cf2.quoracdn.net/main-qimg-52499711003f95fba3ec9e91f983a006-lq",
        status: "active",
        email: "loony@quirkymail.com",
        age: 21
    },
    {
        id: 7,
        username: "Sirius",
        img: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Sirius-Black.Harry-Potter-Series.webp",
        status: "inactive",
        email: "padfoot@azkaban.net",
        age: 35
    },
    {
        id: 8,
        username: "McGonagall",
        img: "https://v4m9y9w9.rocketcdn.me/wp-content/uploads/2019/10/Professor-McGonagall-F-1.jpg",
        status: "active",
        email: "transfiguration@hogwarts.com",
        age: 70
    },
    {
        id: 9,
        username: "Neville",
        img: "https://hips.hearstapps.com/ellnl.h-cdn.co/assets/15/37/2048x2730/2048x2730-het-is-een-goede-dag-6151832-1-eng-gb-neville-longbottom-showt-zijn-sixpack-het-is-een-goede-dag-jpg.jpg?resize=640:*",
        status: "active",
        email: "braveheart@herbology.org",
        age: 21
    },
    {
        id: 10,
        username: "Tonks",
        img: "https://static.wikia.nocookie.net/warner-bros-entertainment/images/b/bf/Nymphadora_Tonks.jpg/revision/latest?cb=20220419220507",
        status: "active",
        email: "metamorphmagus@order.com",
        age: 26
    }
    
];


