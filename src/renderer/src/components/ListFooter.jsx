import { Spin } from 'antd'
import css from "./styles/ListFooter.module.less"
const listFooter = (props) => {
    const { loading, finish } = props
    return (
        <div className={css.footer}>
            {loading && <Spin />}
            {finish && !loading && <p className={css.footer_over}>已全部加载</p>}
        </div>
    )
}
export default listFooter