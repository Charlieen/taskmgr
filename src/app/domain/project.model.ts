export interface Project {
id?: string;
name: string;
desc?: string;
coverImg: string;
taskList?:string[]; // 任务 id
members?: string[]; // 成员id

}
