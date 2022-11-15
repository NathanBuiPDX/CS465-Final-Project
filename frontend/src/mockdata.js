export const Users = [
    {
        id: "1",
        name: "nathan",
        full_name: "nathan bui",
        icon_url: "/assets/2.png",
        gender: "male",
        dob: "22/03/2000",
        about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
        id: "2",
        name: "micheal",
        full_name: "micheal kor",
        icon_url: "/assets/1.png",
        gender: "male",
        dob: "22/03/2000",
        about: "love doing stuff"
    },
    {
        id: "3",
        name: "kelvin",
        full_name: "kelvin kim",
        icon_url: "/assets/3.jfif",
        gender: "female",
        dob: "22/03/2000",
        about: "love doing stuff"
    },
    {
        id: "4",
        name: "john",
        full_name: "john snow",
        icon_url: "/assets/5.webp",
        gender: "female",
        dob: "22/03/2000",
        about: "love doing stuff"
    },
]

export const Posts = [
    {
        id: "1",
        user_id: "1",
        post_time: '2022-11-09T06:20:11.514Z',
        image_url: '/assets/1.png',
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book",
        like_count: 10,
        comments_count: 20
    },
    {
        id: "2",
        user_id: "2",
        post_time: '2022-11-05T06:20:11.514Z',
        image_url: '/assets/2.png',
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book",
        like_count: 5,
        comments_count: 1
    },
    {
        id: "3",
        user_id: "3",
        post_time: '2022-11-07T06:20:11.514Z',
        image_url: '/assets/1.png',
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book",
        like_count: 1,
        comments_count: 1
    },
    {
        id: "4",
        user_id: "4",
        post_time: '2022-11-01T06:20:11.514Z',
        image_url: '/assets/1.png',
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book",
        like_count: 10,
        comments_count: 20
    }
]

export const Comments = [
    {
        id: "1",
        post_id: "2",
        user_id: "1",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        id: "2",
        post_id: "1",
        user_id: "2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        id: "3",
        post_id: "1",
        user_id: "2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    }
]