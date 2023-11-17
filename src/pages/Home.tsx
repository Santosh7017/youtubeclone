import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePagevideos } from '../store/reducers/GetHomePageVideos'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/Spinner'
import Card from '../components/Card'
import { HomePageVideos } from '../Types'
import { clearVideos } from '../store'

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch])

  useEffect(() => {
    dispatch(getHomePagevideos(false));

    // console.log("videos",videos);

    
    
  }, [dispatch]);
  
  return (
    <div className='max-h-screen overflow-hidden'>
        <div style={{height: "7.5vh"}}>
        <Navbar />
        </div>
        <div className='flex ' style={{height: "92.5vh"}} >
            <Sidebar />
            {videos.length ? (
              <InfiniteScroll dataLength={videos.length}
              next={() => dispatch(getHomePagevideos(true))}
              hasMore= {videos.length <500}
              loader={<Spinner />}
              height={650}
              >
                <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                  {videos.map ((item:HomePageVideos) => {
                    return <Card data = {item} key = {item.videoId} />
                  })}
                </div>

              </InfiniteScroll>
            ): (
              <Spinner />
            )}
            
             </div>
    </div>
  )
}

export default Home