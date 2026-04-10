import Container from '@mui/material/Container'
import cn from 'classnames'
import {
	IconInstagram,
	IconTelegram,
	IconVK,
	IconViber,
	IconWtsp,
	Logo,
} from '../../assets/images/svg'
import s from './Footer.module.css'
import { FOOTER_SETTINGS_TEST_ID } from './helpers'

// TODO: мемеоизировать
export const Footer = () => (
	<footer
		className={cn(s.footer)}
		data-testid={FOOTER_SETTINGS_TEST_ID.FOOTER}>
		<Container
			maxWidth='lg'
			sx={{ display: 'flex' }}
			className={cn(s.footer__wrapper, s.footer__nav)}>
			<Logo dataTestId={FOOTER_SETTINGS_TEST_ID.LOGO} />
			<ul>
				<li>Каталог</li>
				<li>Акции</li>
				<li>Новости</li>
				<li>Отзывы</li>
			</ul>
			<ul>
				<li>Оплата и доставка</li>
				<li>Часто спрашивают</li>
				<li>Обратная связь</li>
				<li> Контакты</li>
			</ul>
			<div className={cn(s.footer__feedback)}>
				<ul>
					<li>Мы на связи</li>
					<li>8 (999) 00-00-00</li>
					<li className={cn(s.footer__feedback_email)}>
						dogfood.ru@gmail.com
					</li>
					<div
						className={cn(s.footer__icons)}
						data-testid={FOOTER_SETTINGS_TEST_ID.GROUP_ICONS}>
						<IconTelegram />
						<IconWtsp />
						<IconViber />
						<IconInstagram />
						<IconVK />
					</div>
				</ul>
			</div>
		</Container>
	</footer>
)
