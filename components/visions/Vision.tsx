import { Check } from 'lucide-react'
import './vision.css';
import { Separator } from '../ui/separator';

export default function Vision() {
  return (
    <div className=' text-right pt-60'>
      <div>
        <div>
          <div className=''>
            <h1 className='text-5xl text-center mb-14 '>رؤيتنا والقيمة المضافة</h1>
          </div>
          <div className='flex items-center justify-around flex-row-reverse gap-10'>
            <p className='text-2xl text-center w-[40%]'>بوابة لمساعدة القادة الذين يتخذون القرارات ويريدون اكتشاف القدرات البشرية وربطها بوظائف تتناسب مع قدراتهم من أجل إنتاجية أفضل وإنفاق فعال ومتوازن في التدريب والتوظيف، وللفرد الذي يبحث عن الإبداع في أفضل وظيفة له.</p>
            <Separator className='h-40 opacity-50' orientation='vertical'/>
            <div className='added-values '>
              <div className='added-values_item'>
                <Check color='black'/>
                <p> استخدام أدوات الذكاء الاصطناعي لتحيل نتائج الاختبارات</p>
              </div>
              <div className='added-values_item'>
                <Check color='black'/>
                <p> استخدام أول مقياس عربي لقياس قدرات الأفراد من خلال خوارزميات رياضية</p>
              </div>
              <div className='added-values_item'>
                <Check/>
                <p> قاعدة بيانات مركزية لربط وتحليل البيانات الذكية للنتائج</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='w-full h-[50vh] mt-60 text-center'>
        <h4 className='text-4xl mb-14 '>تبدأ الرحلة من هنا</h4>
        <div className=''>
          <p>اكتشف نفسك أكثر وتعرّف على سماتك الشخصية ونقاط قوتك وضعفك لتصبح أفضل</p>
        </div>
      </div>

    </div>
  )
}
