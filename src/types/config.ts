import { FormDesc } from "@/types/formList";

// 配置
export interface Config {
  url?: string;
  attrs?: FormDesc;
  attrsData?: AnyObj;
  attrsDefaultData?: AnyObj;
  common?: FormDesc;
  commonData?: AnyObj;
  commonDefaultData?: AnyObj;
  assistProperty?: string[];
}
