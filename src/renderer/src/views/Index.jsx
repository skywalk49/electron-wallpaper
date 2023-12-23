import { useState, useEffect, useRef } from 'react'
import request from "@/utils/request"
import css from "@/styles/index.module.less"
import { Image, Card } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { ListFooter } from '@/components'
import download from "downloadjs"

const Index = () => {
    const [options, setOptions] = useState([])
    const [optionId, setOptionId] = useState("")
    const [images, setImages] = useState([])
    const [start, setStart] = useState(0)
    const [loading, setLoading] = useState(false)
    const [finish, setFinish] = useState(false)

    // 加载图片分类
    useEffect(() => {
        request("/index.php?c=WallPaper&a=getAllCategories").then(res => {
            const data = Object.values(res.data)
            setOptions(data)
            setOptionId(data[0].id)
        })
    }, [])

    // 选择分类
    const activeNav = (id) => {
        if (optionId == id) return
        setOptionId(id)
        setImages([])
        setStart(0)
    }

    // 触底加载
    const photoRef = useRef(null)
    useEffect(() => {
        photoRef.current?.addEventListener("scroll", handleScroll)
        return () => {
            photoRef.current?.removeEventListener("scroll", handleScroll)
        }
    }, [images])
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target
        if (scrollTop + clientHeight >= scrollHeight) {
            setStart(images.length)
        }
    }

    useEffect(() => {
        if (!optionId || loading) return
        setLoading(true)
        request(`/index.php?c=WallPaper&a=getAppsByCategory&cid=${optionId}&start=${start}&count=30`).then(res => {
            const { data } = res
            setImages(images.concat(data))
            setLoading(false)
            if (data.length < 30) {
                setFinish(true)
            } else {
                setFinish(false)
            }
        })
    }, [start, optionId])
    const { Meta } = Card
    return (
        <div className={css.box}>
            <ul className={css.nav}>
                {options.map((item) => {
                    return <li className={[css.nav_item, optionId == item.id && css.nav_item_active].join(" ")} key={item.id}
                        onClick={() => activeNav(item.id)}>
                        {item.name}
                    </li>
                })}
            </ul>
            <div className={css.photo} ref={photoRef}>
                <div className={css.photo_box}>
                    <Image.PreviewGroup>
                        {
                            images.map((item) => {
                                return (
                                    <div className={css.photo_item} key={item.id}>
                                        <Card hoverable style={{ width: 270 }}
                                            cover={<Image alt="example" src={item.url} />}
                                            actions={[<DownloadOutlined onClick={() => download(item.url)} />]}>
                                            <Meta title={item.utag} />
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </Image.PreviewGroup>
                </div>
                <ListFooter loading={loading} finish={finish} />
            </div>
        </div>
    )
}
export default Index