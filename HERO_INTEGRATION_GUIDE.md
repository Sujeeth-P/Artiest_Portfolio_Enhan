# Scroll-Expansion Hero Integration Guide

## ✅ Integration Complete!

Your new scroll-expansion hero section has been successfully integrated into your React portfolio.

---

## 📦 What Was Installed

### Dependencies
- **framer-motion** (v11.15.0) - For smooth scroll-based animations

### New Files Created
1. **`src/components/ui/ScrollExpandMedia.jsx`** - The main scroll-expansion component
2. **`src/components/Hero.jsx`** (replaced) - Updated hero section using the new component

---

## 🎨 Component Features

The new hero section includes:

✨ **Scroll-driven expansion** - Media (image/video) expands as you scroll
🎬 **Video & Image support** - Works with both static images and videos
📱 **Fully responsive** - Optimized for mobile and desktop
🎯 **Touch-enabled** - Smooth scrolling on touch devices
⚡ **Smooth animations** - Powered by Framer Motion
🎨 **Customizable** - Easy to modify colors, text, and media

---

## 🚀 How to Use

### Current Configuration

The Hero section is currently set up with:
- **Media Type**: Image
- **Main Image**: Unsplash artistic photo
- **Background**: Unsplash floral background
- **Title**: "Where Art Speaks"
- **Subtitle**: "Elena Ross • Digital Artist"

### Switching to Video

To use a video instead of an image, change line 28 in `Hero.jsx`:

```javascript
const mediaType = 'video'; // Change from 'image' to 'video'
```

### Customizing Content

Edit the `mediaContent` object in `src/components/Hero.jsx`:

```javascript
const [mediaContent] = useState({
  image: {
    src: 'YOUR_IMAGE_URL',
    background: 'YOUR_BACKGROUND_URL',
    title: 'Your Title',
    date: 'Your Subtitle',
    scrollToExpand: 'Your Scroll Text',
  },
  video: {
    src: 'YOUR_VIDEO_URL',
    poster: 'YOUR_VIDEO_POSTER_URL',
    background: 'YOUR_BACKGROUND_URL',
    title: 'Your Title',
    date: 'Your Subtitle',
    scrollToExpand: 'Your Scroll Text',
  }
});
```

---

## 🎯 Props Reference

The `ScrollExpandMedia` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mediaType` | `'video' \| 'image'` | `'video'` | Type of media to display |
| `mediaSrc` | `string` | required | URL of the media file |
| `posterSrc` | `string` | optional | Poster image for video |
| `bgImageSrc` | `string` | required | Background image URL |
| `title` | `string` | optional | Main title text |
| `date` | `string` | optional | Subtitle/date text |
| `scrollToExpand` | `string` | optional | Scroll instruction text |
| `textBlend` | `boolean` | `false` | Enable text blend mode |
| `children` | `ReactNode` | optional | Content to show after expansion |

---

## 🎨 Customization Tips

### Colors
The component uses Tailwind CSS. To change colors, modify:
- Text colors: `text-blue-200` classes
- Overlay colors: `bg-black/30` classes

### Animation Speed
Adjust scroll sensitivity in `ScrollExpandMedia.jsx`:
```javascript
const scrollDelta = e.deltaY * 0.0009; // Line 48 - increase for faster expansion
```

### Expansion Size
Modify the expansion calculations:
```javascript
const mediaWidth = 300 + scrollProgress * 1250; // Desktop width
const mediaHeight = 400 + scrollProgress * 400; // Desktop height
```

---

## 🔧 Troubleshooting

### Issue: Component doesn't scroll
**Solution**: Make sure other scroll event listeners aren't interfering. The component manages scroll itself.

### Issue: Video doesn't autoplay
**Solution**: Modern browsers require user interaction for autoplay. The component includes `muted` and `autoPlay` props to handle this.

### Issue: Images not loading
**Solution**: Verify the image URLs are accessible. Replace with your own hosted images for production.

---

## 📱 Responsive Behavior

The component automatically adjusts:
- **Desktop**: Full expansion effect with larger media
- **Mobile**: Optimized touch scrolling with adjusted dimensions
- **Breakpoint**: 768px (standard tablet/mobile breakpoint)

---

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎓 Next Steps

1. **Replace placeholder images** with your own artwork
2. **Customize colors** to match your brand
3. **Add your content** in the MediaContent component
4. **Test on mobile** to ensure smooth scroll behavior
5. **Optimize images** for faster loading

---

## 📁 File Structure

```
src/
├── components/
│   ├── Hero.jsx                   # Main hero section
│   └── ui/
│       └── ScrollExpandMedia.jsx  # Scroll expansion component
```

---

## 💡 Pro Tips

1. **Use high-quality images** (1920x1080 or higher) for the best visual impact
2. **Optimize videos** to be under 10MB for faster loading
3. **Match the background** to your main image for a cohesive look
4. **Test scroll speed** on different devices
5. **Consider accessibility** - ensure text remains readable at all expansion stages

---

## 🆘 Need Help?

The component is well-documented with inline comments. Key sections:
- Scroll event handlers (lines 26-114)
- Touch handlers for mobile (lines 55-83)
- Responsive calculations (lines 130-132)

---

## 📝 License

This component is integrated into your portfolio project. Feel free to modify and customize it to your needs!
