import { languages } from "@/config";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MdOutlineLanguage } from "react-icons/md";

const ChangeLangs = ({
  locale,
  page = ''
}: { locale: any; page: any }) => {

  const handleSelectItem = (selectedName: any) => {
    const baseUrl = selectedName === 'ja' ? '' : `/${selectedName}`;
    const url = page ? `${baseUrl}${page}` : baseUrl || '/';
    window.location.href = url;
  };
  return (
    <Select defaultValue={locale} onValueChange={handleSelectItem}>
      <SelectTrigger className="w-[134px] h-[32px]">
        <MdOutlineLanguage className="w-5 h-5"/>
        <SelectValue placeholder="Select a fruit"/> 
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((item, index) => (
            <SelectItem  key={index} value={item.lang}>
              <div className="items-center flex flex-row">
                {item.language}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

}

export default ChangeLangs;
