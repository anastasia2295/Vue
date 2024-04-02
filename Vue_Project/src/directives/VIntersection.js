export default {
    mounted(el, binding) {
        console.log(el)
        const option ={
            rootMargin:  '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting){
                binding.value()
            }
        }
        const observer = new IntersectionObserver(callback, option)
        observer.observe(el) 
    },
    name: "intersection"
}