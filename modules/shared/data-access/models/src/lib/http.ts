import { MultiResponse, SingleResponse } from "giphy-api";
import { PeGIFObject } from "./gif";

export interface PeMultiResponse extends MultiResponse {
    data: PeGIFObject[]
}


export interface PeSingleResponse extends SingleResponse {
    data: PeGIFObject
}