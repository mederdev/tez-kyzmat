import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { SERVICE_CATEGORIES, LOCATIONS } from "./constants/locations";

@ApiTags("common")
@Controller("common")
export class CommonController {
  @Get("categories")
  @ApiOperation({
    summary: "Список категорий техники",
    description: "Возвращает все доступные категории техники и оборудования",
  })
  @ApiResponse({
    status: 200,
    description: "Список категорий",
    schema: {
      example: {
        success: true,
        data: [
          { key: "tractors", name: "Тракторы" },
          { key: "trucks", name: "КамАЗы и грузовики" },
          { key: "concrete", name: "Бетономешалки" },
          { key: "unloading", name: "Разгрузочная техника" },
          { key: "water", name: "Водовозы" },
        ],
      },
    },
  })
  getCategories() {
    return {
      success: true,
      data: SERVICE_CATEGORIES,
    };
  }

  @Get("locations")
  @ApiOperation({
    summary: "Список регионов и районов",
    description: "Возвращает все регионы Кыргызстана с их районами",
  })
  @ApiResponse({
    status: 200,
    description: "Список регионов и районов",
    schema: {
      example: {
        success: true,
        data: {
          bishkek: {
            name: "г. Бишкек",
            districts: {
              leninsky: "Ленинский район",
              pervomaysky: "Первомайский район",
              sverdlovsky: "Свердловский район",
              oktyabrsky: "Октябрьский район",
            },
          },
          osh: {
            name: "г. Ош",
            districts: {
              city: "Центр города",
            },
          },
          chui: {
            name: "Чуйская область",
            districts: {
              alamudun: "Аламудунский район",
              chui: "Чуйский район",
              jayyl: "Жайылский район",
              kemin: "Кеминский район",
              moskva: "Московский район",
              panfilov: "Панфиловский район",
              sokuluk: "Сокулукский район",
              ysyk_ata: "Ысык-Атинский район",
            },
          },
        },
      },
    },
  })
  getLocations() {
    return {
      success: true,
      data: LOCATIONS,
    };
  }

  @Get("districts/:location")
  @ApiOperation({
    summary: "Районы конкретного региона",
    description: "Возвращает список районов для указанного региона",
  })
  @ApiParam({
    name: "location",
    description: "Код региона",
    example: "bishkek",
  })
  @ApiResponse({
    status: 200,
    description: "Список районов",
    schema: {
      example: {
        success: true,
        data: {
          leninsky: "Ленинский район",
          pervomaysky: "Первомайский район",
          sverdlovsky: "Свердловский район",
          oktyabrsky: "Октябрьский район",
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Регион не найден",
    schema: {
      example: {
        success: false,
        message: "Регион не найден",
      },
    },
  })
  getDistricts(@Param("location") location: string) {
    const locationData = LOCATIONS[location];
    if (!locationData) {
      return {
        success: false,
        message: "Регион не найден",
      };
    }

    return {
      success: true,
      data: locationData.districts || {},
    };
  }
}
