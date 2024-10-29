// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-pink-300 text-white cursor-pointer hover:bg-pink-500 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-pink-500 !outline-none'],
    ['stats', 'inline-grid rounded-md'],
    ['stat', 'inline-grid w-full grid-cols-1'],
    ['stat-value', 'text-28px md:text-4xl font-extrabold leading-tight'],
    ['active', 'bg-pink-300'],
    ['router-link-css', 'flex cursor-pointer items-center gap-4 rounded-lg p-0 md:p-4 text-center transition-colors duration-200 ease-in-out md:hover:bg-[#7F7F7F]'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
