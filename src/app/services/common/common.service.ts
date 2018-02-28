import { Injectable } from '@angular/core';

import { MainData } from '../../models/main-data/main-data.model';

@Injectable()
export class CommonService {
    data: MainData = null;
}
