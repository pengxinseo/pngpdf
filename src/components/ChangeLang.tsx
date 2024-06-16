import { languages } from "@/config";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const ChangeLangs = ({
  locale,
  page = ''
}: { locale: any; page: any }) => {

  const handleSelectItem = (selectedName:any) => {
    console.log(selectedName);
    const url = `/${selectedName === 'ja' ? '' : `${selectedName}`}`;
    window.location.href = url;
  };
  return (
    <Select defaultValue={locale} onValueChange={handleSelectItem}>
      <SelectTrigger className="w-[134px] h-[32px]">
        <SelectValue  placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((item, index) => (
              <SelectItem key={index} value={item.lang} >
                <a href="https://baidu.com">
                  <div className="items-center flex flex-row">
                    <span dangerouslySetInnerHTML={{ __html: item.svg }} className="mr-2"/> {item.language}
                  </div>
                </a>
              </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

}

export default ChangeLangs;
