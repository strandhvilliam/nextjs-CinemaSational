import styles from './PostFeed.module.css'
import SmallPostItem from "@/app/components/SmallPostItem";

const MOCK_POSTS: Post[] = [
    {
        slug: '1234124qawfawf',
        title: 'Testing title 11212r12f121f12f12f1 2jklhnkajhiouethakejthalektjha',
        content: 'Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        published: true,
        authorId: '1234124qawfawf',
        authorName: 'John Doe',
        heartIds: [],
        authorPhotoUrl: 'https://lh3.googleusercontent.com/ogw/AAEL6sirB03fzJPdOuwoyRVMDJDEsCBj6TvZpSB-44vuyQ=s64-c-mo',
        movieId: '1234124qawfawf',
        movieTitle: 'The Matrix',
    },
    {
        slug: '1234124qawfawf',
        title: 'Testing title 1',
        content: 'Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        published: true,
        authorId: '1234124qawfawf',
        authorName: 'John Doe',
        heartIds: [],

        authorPhotoUrl: 'https://lh3.googleusercontent.com/ogw/AAEL6sirB03fzJPdOuwoyRVMDJDEsCBj6TvZpSB-44vuyQ=s64-c-mo',
        movieId: '1234124qawfawf',
        movieTitle: 'The Matrix',
    },
    {
        slug: '1234124qawfawf',
        title: 'Testing title 1',
        content: 'Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        published: true,
        authorId: '1234124qawfawf',
        authorName: 'John Doe',
        heartIds: [],

        authorPhotoUrl: 'https://lh3.googleusercontent.com/ogw/AAEL6sirB03fzJPdOuwoyRVMDJDEsCBj6TvZpSB-44vuyQ=s64-c-mo',
        movieId: '1234124qawfawf',
        movieTitle: 'The Matrix',
    },
    {
        slug: '1234124qawfawf',
        title: 'Testing title 1',
        content: 'Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1Testing content 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        published: true,
        authorId: '1234124qawfawf',
        authorName: 'John Doe',
        heartIds: [],

        authorPhotoUrl: 'https://lh3.googleusercontent.com/ogw/AAEL6sirB03fzJPdOuwoyRVMDJDEsCBj6TvZpSB-44vuyQ=s64-c-mo',
        movieId: '1234124qawfawf',
        movieTitle: 'The Matrix',
    }
]

const PostFeed = () => {
    return (
        <div className={styles.feed}>
            {MOCK_POSTS.map((post) => (
                <SmallPostItem post={post} key={post.slug} />
            ))}
        </div>
    );
};

export default PostFeed;
